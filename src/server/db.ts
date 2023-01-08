import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

import { env } from "../env/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  /* hash password when create user */
  prisma.$use(async (params, next) => {
    if (params.model === 'User' && (params.action === 'create')) params.args.data.password = await argon2.hash(params.args.data.password)
    return next(params)
  })

  /* verify password when login */
  prisma.$use(async (params, next) => {
    if (params.model === "User" && params.action === "findFirst") {
      const password = params.args.where?.password
      if (password) {
        delete params.args.where.password
      }
      const user = await next(params)
      if (password) {
        try {
          if (user && await argon2.verify(user.password, password)) {
            return user
          }
        } catch (error) {
          return null
        }
        return null
      } else {
        return user
      }
    }
    return next(params)
  })

  global.prisma = prisma;
}
