const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
const AuthMutationsFunction = require('./auth');
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  const authMutations = AuthMutationsFunction(app);
  return {
    //Date: DateScalar,
    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
          return jwt.decode(context.token, app.get('JWT_SECRET'));
        }
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }) {
        try {
          return await pgResource.getItems(filter);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, args, { pgResource }) {
        try {
          return await pgResource.getTags();
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      async items({ id }, args, { pgResource }) {
        try {
          return await pgResource.getItemsForUser(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrowed({ id }, args, { pgResource }) {
        try {
          return await pgResource.getBorrowedItemsForUser(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Item: {
      async itemowner({ itemowner }, args, { pgResource }) {
        try {
          return await pgResource.getUserById(itemowner);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags({ id }, args, { pgResource }) {
        try {
          return await pgResource.getTagsForItem(id);
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower({ borrower }, args, { pgResource }) {
        try {
          return await pgResource.getUserById(borrower);
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Mutation: {
      ...authMutations,
      async addItem(parent, { item, image }, context, info) {
        try {
          image = await image;
          const user = context.token.id;
          const newItem = await context.pgResource.saveNewItem({
            item,
            image,
            user
          });
          return newItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    }
  };
};
