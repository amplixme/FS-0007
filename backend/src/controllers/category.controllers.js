import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/category.service.js";

import { success } from "../utils/response.js";

export const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    success(res, categories);
  } catch (err) {
    next(err);
  }
};

export const createCategoryController = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    const category = await createCategory(name, slug);

    success(res, category, 201);
  } catch (err) {
    next(err);
  }
};

export const updateCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const category = await updateCategory(id, name, slug);

    success(res, category);
  } catch (err) {
    next(err);
  }
};

export const deleteCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteCategory(id);

    success(res, "Categoria eliminada correctamente");
  } catch (err) {
    next(err);
  }
};
