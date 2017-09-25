import _ from 'lodash';

const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context) => {
      await resolver(parent, args, context);
      return childResolver(parent, args, context);
    }
    return createResolver(newResolver);
  }
  return baseResolver;
}

export const requiresAuth = createResolver( (parent, args, context) => {
  if (!context.user || !context.user.id) {
    throw {name: "NotAuthenticatedError", message: "Not authenticated."};
  }
});

export const requiresAdmin = requiresAuth.createResolver( (parent, args, context) => {
  if (!context.user.isAdmin) {
    throw new Error('Requires admin access');
  }
});

export const ensuresSameUser = requiresAuth.createResolver( (parent, args, context) => {
  const isSameUser = args.userId === context.user.id;
  if (!isSameUser) {
    throw new Error("Cannot delete other user's resources");
  }
});