import { Hono } from 'hono'
import { userRoute } from './routes/user'
import { hashRoute } from './routes/hash'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }

}>()
app.route("/api/v1/user", userRoute);
app.route("/api/v1/hash", hashRoute);




export default app
