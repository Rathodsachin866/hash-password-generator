import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { signupInput, signinInput } from '@sachinrathod/common-blogsss';

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

// Signup Route
userRoute.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ msg: "Input not correct" });
  }

  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  //@ts-ignore
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});

// Signin Route
userRoute.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Input is incorrect" });
  }

  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found" });
  }

  //@ts-ignore
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: "The user exists in this application",
  });
});
