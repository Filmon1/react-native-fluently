// Ambient declarations so TypeScript understands static image imports
// (Metro resolves these at bundle time to an asset reference).
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";
declare module "*.svg";