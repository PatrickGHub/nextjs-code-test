import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Form } from '../components'

const availableIntegrations: string[] = [
  'Salesforce',
  'HubSpot',
  'Zapier'
]

const Home: NextPage = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)

  return (
    <div className={styles.container}>
      <Head>
        <title>Blinq • Integrations</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blinq</h1>

        <p className={styles.description}>Manage your integrations here</p>

        <p>Available integrations:</p>

        <div className={styles.grid}>
          {
            availableIntegrations.map((integration) => {
              return (
                <div
                  key={integration}
                  className={styles.card}
                  onClick={() => setSelectedIntegration(integration)}
                >
                  {integration}
                </div>
              )
            })
          }
        </div>

        <div className={styles.grid}>Build here</div>

        <Form integration={selectedIntegration} />
      </main>
    </div>
  );
};

export default Home;
