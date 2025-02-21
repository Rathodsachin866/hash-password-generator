
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from '@sachinrathod/common-blogsss';


export const hashRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>();
  
  hashRoute.use('/*', async (c, next) => {
  
    const authHeader = c.req.header("Authorization") || "";
  
  
    try {
      const user = await verify(authHeader, c.env.JWT_SECRET);
      if (user) {
        //@ts-ignore
        c.set("userId", user.id);
        await next();
      }
      else {
        c.status(403);
        return c.json({
          massege: "you are not logged in"
        })
      }
    }
    catch (e) {
      c.status(403);
      return c.json({
        massege: "you are not logged in"
      })
    }
  
  });

  hashRoute.get('/api/v1/hash/:id', (c) => {
    const id = c.req.param('id')
    console.log(id);
    return c.text('get blog route')
    
})


hashRoute.post('/api/v1/hash', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        massege:"input are incorrect"
      })
    }
    //@ts-ignore
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const blog = await prisma.post.create({
  
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId)
      }
    })
    return c.json({
      id: blog.id
    })
  })
   
hashRoute.put('/api/v1/hash', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        massege:"input are incorrect"
      })
    }
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const blog = await prisma.post.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content,
  
      }
    })
    return c.json({
      id: blog.id
    })
  })

  hashRoute.get('/id:', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const post = await prisma.post.findFirst({
        where: {
          id: id
        }
      })
      return c.json({
        id: post?.id
      })
    }
    catch (e) {
      c.status(411);
      return c.json({
        massege: "error while fetching the data"
      })
    }
  
  })
  
  hashRoute.get("/hash/bulk", async (c) => {
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
  
    return c.json({
      blogs
    })
  })

