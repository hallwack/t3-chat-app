import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  try {
    const user = await prisma?.user.findFirst({
      where: { email }
    })

    return res.json({
      success: true,
      message: "User find successfully",
      results: user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User find failed",
    })
  }
}
