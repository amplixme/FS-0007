import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PostCard from "./PostCard";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => vi.fn() };
});

const basePost = {
  id: "1",
  title: "Mi primer post",
  content: "Contenido de prueba ".repeat(10), // > 150 chars para forzar truncado
  categories: [{ slug: "js", name: "JavaScript" }],
  author: { name: "Martino", avatarUrl: null },
  authorId: "u1",
  createdAt: new Date().toISOString(),
  coverImage: null,
  _count: { comments: 5 },
};

function renderPostCard(post = basePost, onClickCat = vi.fn()) {
  return render(
    <MemoryRouter>
      <PostCard post={post} onClickCat={onClickCat} />
    </MemoryRouter>
  );
}

describe("PostCard", () => {
  it("renderiza el título del post", () => {
    renderPostCard();
    expect(screen.getByText("Mi primer post")).toBeInTheDocument();
  });

  it("renderiza el nombre del autor", () => {
    renderPostCard();
    expect(screen.getByText("Martino")).toBeInTheDocument();
  });

  it('muestra "Autor desconocido" si no hay autor', () => {
    renderPostCard({ ...basePost, author: null });
    expect(screen.getByText("Autor desconocido")).toBeInTheDocument();
  });

  it("renderiza el extracto truncado a 150 caracteres", () => {
    renderPostCard();
    const expectedExtract = `${basePost.content.slice(0, 150)}...`;
    expect(screen.getByText(expectedExtract)).toBeInTheDocument();
  });

  it("muestra la cantidad de comentarios", () => {
    renderPostCard();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
