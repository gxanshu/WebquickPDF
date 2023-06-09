import Layout from "components/layouts";
import { Flex, Input, SimpleGrid, ActionIcon, Group } from "@mantine/core";
import { IconFolderSearch, IconReload } from "@tabler/icons-react";
import {
  AddButton,
  PdfCompanyCard,
} from "components/Button/ActionButtons";
import { getHttpImage } from "services/utils";
import type { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies, addCompany } from "services/redux/allCompanies";
import { AppDispatch } from "../../store";
import { setData, getData } from "services/database";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";

export default function Home() {
  const allCompnay = useSelector(
    (state: RootState) => state.companies.companies
  );
  const dispatch = useDispatch<AppDispatch>();

  const syncAllCompany = () => {
    dispatch(fetchCompanies())
      .then(unwrapResult)
      .then((res) => {
        setData("company", "companies", res);
      });
  };

  const getDataFromIdbStorage = async () => {
    let data: any = await getData("company", "companies");
    console.log(data)
    if (data !== null) {
      dispatch(addCompany(data));
    }
  };

  useEffect(() => {
    getDataFromIdbStorage();
  }, []);

  return (
    <Layout>
      <Flex justify="center" align="center" direction="column">
        <p>Newspapers</p>
        <Group w={"100%"}>
          <Input
            w={"95%"}
            placeholder="enter newspaper name"
            rightSection={
              <IconFolderSearch
                size="1rem"
                style={{ display: "block", opacity: 0.5 }}
              />
            }
          />
          <ActionIcon variant={"gradient"} p={5} size="lg" onClick={syncAllCompany}>
          <IconReload />
          </ActionIcon>
        </Group>
      </Flex>
        <SimpleGrid cols={8} w="100%" spacing={"lg"} mt={60}>
          <AddButton url="/company" />

          {allCompnay !== undefined
            ? Object.values(allCompnay).map((company: any) => {
                return (
                  <PdfCompanyCard
                    key={company.id}
                    id={company.id}
                    logo={getHttpImage(company.logo)}
                  />
                );
              })
            : null}
        </SimpleGrid>
    </Layout>
  );
}
