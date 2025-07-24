import { BlobServiceClient } from "@azure/storage-blob";

export const uploadToAzure = async (file, sasUrl) => {
  const blobServiceClient = new BlobServiceClient(sasUrl);
  const containerClient = blobServiceClient.getContainerClient();

  const blobName = `${Date.now()}-${file.name}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file);
  console.log("Upload complete", uploadBlobResponse.requestId);
  return blobName;
};
