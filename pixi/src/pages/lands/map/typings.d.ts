export type PointTuple = [number, number];

export type Coordinates = PointTuple[];

export type Graph = { id: string; label: string; coordinates: Coordinates };
export type GraphCollection = Map<Graph['id'], Graph>;

export type Options = { area: GraphCollection; divided: GraphCollection };
