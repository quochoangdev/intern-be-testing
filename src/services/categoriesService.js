import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Read Categories
const readCategories = async () => {
  try {
    const data = await prisma.categories.findMany();
    return {
      EM: "Read categories success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};
const readCategoriesWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let data = await prisma.categories.findMany({
      skip: offset,
      take: limit,
    });
    return {
      EM: "Read categories success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};
const readCategoriesWithSearch = async (search, limit) => {
  try {
    let data = await prisma.categories.findMany({
      skip: 0,
      take: limit ? limit : undefined,
      where: {
        name: {
          contains: search.trim(),
        },
      },
    });
    return {
      EM: "Read categories success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

// Create Categories
const createCategories = async (data) => {
  try {
    let isCategoriesWithId = await prisma.categories.findUnique({
      where: {
        id: data.id,
      },
    });
    if (isCategoriesWithId) {
      return {
        EM: "ID is exist",
        EC: 1,
        DT: [],
      };
    }
    let isCategoriesWithSlug = await prisma.categories.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (isCategoriesWithSlug) {
      return {
        EM: "Slug is exist",
        EC: 1,
        DT: [],
      };
    }
    await prisma.categories.create({
      data,
    });
    return {
      EM: "A categories is created successfully!",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

// Update Categories
const updateCategories = async (data) => {
  try {
    if (data.slug) {
      let isCategoriesWithSlug = await prisma.categories.findUnique({
        where: {
          slug: data.slug,
        },
      });
      if (isCategoriesWithSlug) {
        return {
          EM: "Slug is exist",
          EC: 1,
          DT: [],
        };
      }
    }
    let isCategories = await prisma.categories.findUnique({
      where: {
        id: data.id,
      },
    });
    if (isCategories) {
      await prisma.categories.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          slug: data.slug,
          isActive: data.isActive,
        },
      });
      return {
        EM: "Update categories success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Categories not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

// Delete Categories
const deleteCategories = async (id) => {
  try {
    let isCategories = await prisma.categories.findUnique({
      where: {
        id: id,
      },
    });
    if (isCategories) {
      await prisma.categories.delete({
        where: {
          id: id,
        },
      });
      return {
        EM: "Delete categories success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Categories not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  readCategories,
  readCategoriesWithPagination,
  readCategoriesWithSearch,
  createCategories,
  updateCategories,
  deleteCategories,
};
