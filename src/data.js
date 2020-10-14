export default {
  name: "Pavel Sládek",
  role: "VP of Engineering",
  children: [
    {
      name: "Adam Sobotka",
      role: "Director of Product Engineering",
      children: [
        {
          name: "Gil Goldman",
          role: "Engineering Manager",
          children: [
            { name: "Orcas", value: 6, role:"team" },
            { name: "Burgers", value: 6, role:"team" },
          ],
        },
        {
          name: "Radim Svoboda",
          role: "Engineering Manager",
          children: [
            { name: "Influencers", value: 8, role:"team" },
            { name: "Bonsai", value: 4, role:"team" },
          ],
        },
        {
          name: "TT",
          role: "Engineering Manager",
          children: [{ name: "BRZ", value: 6, role:"team" }],
        },
        {
          name: "Martin Kadlec",
          role: "Engineering Manager",
          children: [{ name: "Ninja1", value: 6, role:"team" }],
        },
        {
          name: "Vinicius Araujo",
          role: "Engineering Manager",
          children: [{ name: "Pirates", value: 4, role:"team" }],
        },
        {
          name: "Adam Sobotka",
          role: "Director of Product Engineering",
          children: [{ name: "WWW", value: 8, role:"team" }],
        },
      ],
    },
    {
      name: "Otto Kovařík",
      role: "Director of Platform Engineering",
      children: [
        {
          name: "Mehmet Ekmeci",
          role: "Engineering Manager",
          children: [{ name: "Parsers", value: 12, role:"team" }],
        },
        {
          name: "Robert Fišer",
          role: "Engineering Manager",
          children: [{ name: "Dataops", value: 3 , role:"team" }],
        },
        {
          name: "Otto Kovařík",
          role: "Director of Platform Engineering",
          children: [
            { name: "KNK", value: 5 , role:"team"},
            { name: "CommOps", value: 4 , role:"team" },
          ],
        },
      ],
    },
  ],
};
