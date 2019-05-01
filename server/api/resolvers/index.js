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
      viewer() {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
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
      ...authMutations
      // async addItem(parent, { item, imgage }, context, info) {
      // try {
      //   image = await image;
      // }
      /**
       *  @TODO: Destructuring
       *
       *  The 'args' and 'context' parameters of this resolver can be destructured
       *  to make things more readable and avoid duplication.
       *
       *  When you're finished with this resolver, destructure all necessary
       *  parameters in all of your resolver functions.
       *
       *  Again, you may look at the user resolver for an example of what
       *  destructuring should look like.
       */
      // image = await image;
      // const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
      //   const newItem = await context.pgResource.saveNewItem({
      //     item: args.item,ß
      //     image: args.image,
      //     user
      //   });
      //   return newItem;
      // }
    }
  };
};
