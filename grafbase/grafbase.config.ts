import { g, auth, config } from "@grafbase/sdk";

const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  presses: g
    .relation(() => Press)
    .list()
    .optional(),
});

const Press = g.model("Press", {
  strain: g.string().length({ min: 3 }),
  category: g.string().search(),
  image: g.url(),
  description: g.string().optional(),
  createdBy: g.relation(() => User),
});

export default config({
  schema: g,
});