import React, { useEffect, useState } from "react";
import { Client } from "../interfaces/Client";
import ClientData from "../assets/klientai.json";

import {
  clientDataImport,
  clientGetData,
  clientUpdatePostCode,
} from "../services/clientDataService";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
} from "@mui/material";
import BasicTable from "../ui/BasicTable";

const ClientMenu: React.FC = () => {
  const [data, setData] = useState<Client[]>([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {});

  const handleImportClick = async () => {
    try {
      const result = clientDataImport(ClientData);
      console.log("Response:", result);
      setShowTable(false);
    } catch (error) {
      console.log("Error then sending data from json file:", error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      const result = await clientUpdatePostCode();
      console.log("Response:", result);
      setShowTable(false);
    } catch (error) {
      console.log("Error then sending data from json file:", error);
    }
  };

  const handleGetClientDataClick = async () => {
    try {
      const results = await clientGetData();
      setData(results.data);
      setShowTable(true);
    } catch (error) {
      console.log("Error then sending data from json file:", error);
    }
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" style={{ padding: 20, maxWidth: "100%" }}>
          <ButtonGroup variant="outlined" fullWidth>
            <Button onClick={() => handleImportClick()}>
              Importuoti klientus
            </Button>
            <Button onClick={() => handleUpdateClick()}>
              Atnaujinti pašto indeksus
            </Button>
            <Button onClick={() => handleGetClientDataClick()}>
              Klientų sąrašas
            </Button>
          </ButtonGroup>
          <div style={{ marginTop: 20 }}>
            {showTable && data !== null && <BasicTable clients={data} />}
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default ClientMenu;
