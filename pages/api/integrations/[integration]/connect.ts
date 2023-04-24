// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from '../../../../data.json'

type Data = {
  message: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { integration } = _req.query
  const formData = _req.body
  
  data[integration] = {
    connected: true,
    formFields: formData
  }

  console.log(JSON.stringify(data, null, 2))
  
  return res.status(200).json({ message: `${integration} connected` })
}