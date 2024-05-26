import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Read Posts
const readPosts = async () => {
  try {
    const data = await prisma.posts.findMany();
    return {
      EM: "Read posts success",
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
const readPostsWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let data = await prisma.posts.findMany({
      skip: offset,
      take: limit,
    });
    return {
      EM: "Read posts success",
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
const readPostsWithSearch = async (search, limit) => {
  console.log(limit);
  try {
    let data = await prisma.posts.findMany({
      skip: 0,
      take: limit ? limit : undefined,
      where: {
        title: {
          contains: search.trim(),
        },
      },
    });
    return {
      EM: "Read posts success",
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

// Create Posts
const createPosts = async (data) => {
  try {
    let isPostsWithId = await prisma.posts.findUnique({
      where: {
        id: data.id,
      },
    });
    if (isPostsWithId) {
      return {
        EM: "ID is exist",
        EC: 1,
        DT: [],
      };
    }
    let isPostsWithSlug = await prisma.posts.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (isPostsWithSlug) {
      return {
        EM: "Slug is exist",
        EC: 1,
        DT: [],
      };
    }
    await prisma.posts.create({
      data,
    });
    return {
      EM: "A posts is created successfully!",
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

// Update Posts
const updatePosts = async (data) => {
  try {
    if (data.slug) {
      let isPostsWithSlug = await prisma.posts.findUnique({
        where: {
          slug: data.slug,
        },
      });
      if (isPostsWithSlug) {
        return {
          EM: "Slug is exist",
          EC: 1,
          DT: [],
        };
      }
    }
    let isPosts = await prisma.posts.findUnique({
      where: {
        id: data.id,
      },
    });
    if (isPosts) {
      await prisma.posts.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          tags: data.tags,
          author: data.author,
          isActive: data.isActive,
          categoryId: data.categoryId,
        },
      });
      return {
        EM: "Update posts success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Posts not exist",
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

// Delete Posts
const deletePosts = async (id) => {
  try {
    let isPosts = await prisma.posts.findUnique({
      where: {
        id: id,
      },
    });
    if (isPosts) {
      await prisma.posts.delete({
        where: {
          id: id,
        },
      });
      return {
        EM: "Delete posts success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Posts not exist",
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
  readPosts,
  readPostsWithPagination,
  readPostsWithSearch,
  createPosts,
  updatePosts,
  deletePosts,
};
