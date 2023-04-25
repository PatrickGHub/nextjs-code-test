// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IntegrationsData } from "@/types";
import data from '@/data'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<IntegrationsData>
) {
  if (_req.method === 'GET') {
    return res.status(200).send(data)
  }
}
