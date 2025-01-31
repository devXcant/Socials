import Pinata from "@pinata/sdk";

export const pinata = new Pinata({
  pinataJWTKey: process.env.PINATA_JWT || "",
});
