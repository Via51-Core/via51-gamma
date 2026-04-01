// src/types/index.ts
export interface Tenant {
  id: string;
  slug: string;
  config: {
    brand_name?: string;
    campaign_phrases?: string[];
    rotation_speed?: number;
    theme?: string;
  };
  nodeTree: any;
}