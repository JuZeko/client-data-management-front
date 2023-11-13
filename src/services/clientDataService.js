const apiUrl = "http://localhost:5179/ClientData";

export const clientDataImport = async (data) => {
  try {
    const response = await fetch("http://localhost:5179/ClientData/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export const clientUpdatePostCode = async () => {
  try {
    const response = await fetch(
      "http://localhost:5179/ClientData/updatePostCode",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

export const clientGetData = async () => {
  try {
    const response = await fetch(
      "http://localhost:5179/ClientData/getClientData",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const mappedClients = result.map((data, index) => {
      return {
        Name: data.name,
        Address: data.address,
        PostCode: data.postCode,
      };
    });

    return {
      success: true,
      data: mappedClients,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: error.message || "An error occurred",
    };
  }
};
