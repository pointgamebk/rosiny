import { g, auth, config } from "@grafbase/sdk";

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 20 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().optional(),
    presses: g
      .relation(() => Press)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const Press = g
  .model("Press", {
    type: g.string(),
    strain: g.string().length({ min: 3 }),
    image: g.url(),
    notes: g.string().optional(),
    time: g.string().optional(),
    temp: g.string().optional(),
    pressure: g.string().optional(),
    preWeight: g.int().optional(),
    postWeight: g.int().optional(),
    createdBy: g.relation(() => User),
  })
  .search()
  .auth((rules) => {
    rules.public().read(), rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
