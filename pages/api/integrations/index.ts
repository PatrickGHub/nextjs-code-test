// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from '../../../data.json'

type Data = {
  name: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (_req.method === 'GET') {
    return res.status(200).send(data)
  }

  if (_req.method === 'POST') {
    return res.status(200).send({name: 'abc'})
  }
}
