import { useMemo } from "react";
import {
  graphql,
  loadQuery,
  useLazyLoadQuery,
  useRelayEnvironment,
} from "react-relay";
import { useLoaderData } from "react-router";
import { RecordSource } from "relay-runtime";
import type { homeQuery } from "../__relay__/homeQuery.graphql";
import { createRelayLoaderEnvironment } from "../relay/createRelayLoaderEnvironment";

/**
 * 1. 쿼리 선언
 */
const query = graphql`
  query homeQuery {
    ping
  }
`;

export async function loader() {
  const relayEnvironment = createRelayLoaderEnvironment();
  const variables = {};

  /**
   * 2. 쿼리 실행
   */
  const queryRef = loadQuery(relayEnvironment, query, variables);
  await queryRef.source?.toPromise();

  /**
   * 3. 쿼리가 끝난 후 Relay Environment에 들어있는 레코드를 전달
   */
  return {
    recordMap: relayEnvironment.getStore().getSource().toJSON(),
    variables,
  };
}

export default function Home() {
  /**
   * 4. 레코드를 전달받아 Relay Environment 컨텍스트에 Publish
   */
  const { recordMap } = useLoaderData<typeof loader>();
  const relayEnvironment = useRelayEnvironment();

  useMemo(() => {
    const source = RecordSource.create(recordMap ?? {});
    relayEnvironment.getStore().publish(source);
  }, [relayEnvironment, recordMap]);

  /**
   * 5. useLazyLoadQuery()를 다시 호출 (Cache Hit)
   */
  const { variables } = useLoaderData<typeof loader>();
  const data = useLazyLoadQuery<homeQuery>(query, variables);

  /**
   * 6. 렌더링
   */
  return <div>{data.ping}</div>;
}
