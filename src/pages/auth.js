router.post("/login", async (req, res) => {
  const { id, password } = req.body;

  const user = await prisma.user.findFirst({
    where: { ID: id, Password: password }
  });

  if (user) return res.json({ success: true });
  else return res.json({ success: false });
});
