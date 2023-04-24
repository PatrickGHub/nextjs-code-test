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

  const updatedData = data[integration]

  Object.keys(updatedData.formFields).map((formField) => {
    updatedData.formFields[formField].value = ''
  })


  data[integration] = {
    connected: false,
    formFields: {
      ...updatedData.formFields
    }
  }

  console.log('Data updated with disconnection\n', JSON.stringify(data, null, 2))

  return res.status(200).json({ message: `${integration} disconnected` })
}
