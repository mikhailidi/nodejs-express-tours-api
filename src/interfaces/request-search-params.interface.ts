interface RequestSearchParams {
  id?: string;
  name?: string;
  price?: number;
}

interface FilteringParams {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
}

export { RequestSearchParams, FilteringParams };
