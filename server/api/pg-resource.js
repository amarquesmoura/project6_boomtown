function tagsQueryString(tags, itemid, result) {
  /**
   * Challenge:
   * This function is more than a little complicated.
   *  - Can you refactor it to be simpler / more readable?
   *  - Is this
   */
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: `SELECT * FROM users WHERE id = $1`,
        values: [id]
      };

      try {
        const user = await postgres.query(findUserQuery);
        return user.rows[0];
      } catch (e) {
        throw e;
      }
    },

    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE items.itemowner != $1`,
          values: idToOmit ? [idToOmit] : []
        });
        return items.rows;
      } catch (e) {
        throw e;
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE itemowner = $1;`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw e;
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrower = $1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw e;
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query('SELECT * FROM tags');
        return tags.rows;
      } catch (e) {
        throw e;
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = await {
        text: `SELECT * 
        FROM 
          tags
          INNER JOIN itemtags
            ON itemtags.tagid = tags.id
        WHERE 
          itemtags.itemid = $1;`,
        values: [id]
      };
      try {
        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (e) {
        throw e;
      }
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query('BEGIN', async err => {
              const { title, description, tags } = item;

              // Generate new Item query
              const newItemQuery = `INSERT INTO items(title, description, itemowner) VALUES('${title}','${description}',${parseInt(
                user.id
              )}) RETURNING "id", "title", "imageurl", "description", "itemowner", "borrower", "created";`;

              // Insert new Item
              const { rows } = await postgres.query({
                text: newItemQuery
              });

              // Generate tag relationships query (use the'tagsQueryString' helper function provided)
              const newItem = rows[0];
              const tagIds = tags.map(tag => tag.id);
              const tagRelationQuery =
                `INSERT INTO itemtags(tagid, itemid) VALUES ` +
                tagsQueryString(tagIds, newItem.id, '');

              // Insert tags
              await postgres.query({
                text: tagRelationQuery,
                values: tagIds ? tagIds : []
              });

              // Commit the entire transaction!
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
