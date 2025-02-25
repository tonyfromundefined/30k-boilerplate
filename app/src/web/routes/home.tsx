import { graphql } from "react-relay";
import type { homeQuery } from "../__relay__/homeQuery.graphql";
import { relayQueryLoader } from "../relay/relayQueryLoader";
import { useRelayQueryLoaderData } from "../relay/useRelayQueryLoaderData";

const query = graphql`
  query homeQuery {
    ping
  }
`;

export const loader = relayQueryLoader<homeQuery>({
  query,
  variables: () => ({}),
});

export default function Home() {
  const data = useRelayQueryLoaderData<typeof loader>(query);

  return <div>{data.ping}</div>;
}
