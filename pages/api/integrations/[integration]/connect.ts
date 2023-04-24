// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from '@/data'

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


  console.log('Data updated with connection\n', JSON.stringify(data, null, 2))
  
  return res.status(200).json({ message: `${integration} connected` })
}
