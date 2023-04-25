// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { EnabledIntegrations, IntegrationsData, SingleIntegrationData } from '@/types'
import untypedData from '@/data'

const data: IntegrationsData = untypedData

type Data = {
  message: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const integration: EnabledIntegrations = _req.body.integration

  const updatedData: SingleIntegrationData = data[integration]

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
