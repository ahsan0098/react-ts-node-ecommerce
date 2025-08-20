import { userlist, movieslist } from './FakeData.js';
import _ from "lodash"
const resolvers = {
    Query: {
        users: () => userlist,

        user: (parent, args) => _.find(userlist, { id: args.id }),

        movies: () => movieslist,

        movie: (parent, args) => _.find(movieslist, { name: args.name }),

    },
    User: { favoriteMovies: () => _.filter(movieslist, (mv) => mv.released <= 2020) },

    Mutation: {
        createUser: (parent, args) => {
            const user = { ...args.input, id: String(Number(userlist[userlist.length - 1].id) + 1) }
            userlist.push(user)
            return user
        },

        updateUser: (parent, args) => {

            const index = _.findIndex(userlist, { id: args._id });
            if (index === -1) {
                throw new Error("User not found");
            }

            const updatedUser = {
                ...userlist[index],
                ...args.input,
                id: args._id,
            };

            userlist[index] = updatedUser;

            return updatedUser;
        },

        deleteUser: (parent, args) => {

            const index = _.findIndex(userlist, { id: args._id });

            if (index === -1) {
                throw new Error("User not found");
            }

            userlist.splice(index, 1);

            return args._id;
        }
    }
};

export default resolvers;