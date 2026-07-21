import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FormLogin from './FormLogin';
import apiClient from '../services/api';
import { useAuth } from '../context/AuthContext';

vi.mock('../services/api', () => ({
    default: { post: vi.fn() },
}));

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return { ...actual, useNavigate: () => mockNavigate };
});

describe('FormLogin', () => {
    const mockLogin = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useAuth.mockReturnValue({ login: mockLogin });
    });

    function renderForm() {
        return render(
            <MemoryRouter>
                <FormLogin />
            </MemoryRouter>
        );
    }

    function fillForm(email, password) {
        fireEvent.change(screen.getByPlaceholderText('ejemplo@correo.com'), {
            target: { name: 'email', value: email },
        });
        fireEvent.change(screen.getByPlaceholderText('••••••••'), {
            target: { name: 'password', value: password },
        });
    }

    it('muestra error si el email es inválido', async () => {
        renderForm();
        fillForm('no-es-un-email', 'password123');
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(await screen.findByText('El formato del email no es válido.')).toBeInTheDocument();
        expect(apiClient.post).not.toHaveBeenCalled();
    });

    it('muestra error si la contraseña tiene menos de 8 caracteres', async () => {
        renderForm();
        fillForm('test@test.com', '123');
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(await screen.findByText('La contraseña debe tener al menos 8 caracteres.')).toBeInTheDocument();
    });

    it('hace login correctamente y navega a "/" en submit exitoso', async () => {
        apiClient.post.mockResolvedValueOnce({
            data: { data: { token: 'fake-token', user: { id: '1', role: 'user' } } },
        });
        renderForm();
        fillForm('test@test.com', 'password123');
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
                email: 'test@test.com',
                password: 'password123',
            });
        });
        expect(mockLogin).toHaveBeenCalledWith('fake-token', { id: '1', role: 'user' });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('muestra el error del servidor si el login falla', async () => {
        apiClient.post.mockRejectedValueOnce({
            response: { data: { error: { message: 'Credenciales inválidas' } } },
        });
        renderForm();
        fillForm('test@test.com', 'password123');
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(await screen.findByText('Credenciales inválidas')).toBeInTheDocument();
    });

    it('alterna la visibilidad de la contraseña al hacer click en el ícono', () => {
        renderForm();
        const passwordInput = screen.getByPlaceholderText('••••••••');
        expect(passwordInput).toHaveAttribute('type', 'password');

        const toggleButton = screen
            .getAllByRole('button')
            .find((btn) => btn.getAttribute('type') === 'button');
        fireEvent.click(toggleButton);

        expect(passwordInput).toHaveAttribute('type', 'text');
    });
});