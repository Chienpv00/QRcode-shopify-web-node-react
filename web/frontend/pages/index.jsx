import {
    Card,
    EmptyState,
    Layout,
    Page,
    SkeletonBodyText,
} from "@shopify/polaris";
import { TitleBar, useNavigate, Loading } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {

    const navigate = useNavigate();

    const isLoading = false;
    const QRcodes = [];

    const loadingMarkup = isLoading ? (
        <Card sectioned>
            <Loading />
            <SkeletonBodyText />
        </Card>
    ) : null;

    const emptyStateMarkup = !isLoading && !QRcodes.length ? (
        <EmptyState
            heading="Create unique QR codes for your product"
            footerContent="Allow customers to scan codes and buy products using their phones"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            action={{ content: "Create QR code" }}
        ></EmptyState>
    ) : null;
    return (
        <Page>
            <TitleBar
                title="QR codes"
                primaryAction={{ content: "Create QR code" }}
            ></TitleBar>
            <Layout>
                <Layout.Section>
                    {loadingMarkup}
                    {emptyStateMarkup}
                </Layout.Section>
            </Layout>
        </Page>
    );
}
