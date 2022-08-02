import {
    Card,
    EmptyState,
    Layout,
    Page,
    SkeletonBodyText,
} from '@shopify/polaris';
import { TitleBar, useNavigate, Loading } from '@shopify/app-bridge-react';
import { QRCodeIndex } from '../components';
import { useAppQuery } from '../hooks';

export default function HomePage() {
    const navigate = useNavigate();
    /* useAppQuery wraps react-query and the App Bridge authenticatedFetch function */
    const {
        data: QRCodes,
        isLoading,

        /*
      react-query provides stale-while-revalidate caching.
      By passing isRefetching to Index Tables we can show stale data and a loading state.
      Once the query refetches, IndexTable updates and the loading state is removed.
      This ensures a performant UX.
    */
        isRefetching,
    } = useAppQuery({
        url: '/api/qrcodes',
    });

    /* Set the QR codes to use in the list */
    const qrCodesMarkup = QRCodes?.length ? (
        <QRCodeIndex QRCodes={QRCodes} loading={isRefetching} />
    ) : null;

    const loadingMarkup = isLoading ? (
        <Card sectioned>
            <Loading />
            <SkeletonBodyText />
        </Card>
    ) : null;
    const emptyStateMarkup =
        !isLoading && !QRCodes?.length ? (
            <Card sectioned>
                <EmptyState
                    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    action={{
                        content: 'Create QR code',
                        onAction: () => navigate('/qrcodes/new'),
                    }}
                >
                    <p>
                        Allow customers to scan codes and buy products using
                        their phones.
                    </p>
                </EmptyState>
            </Card>
        ) : null;
    return (
        <Page fullWidth={!!qrCodesMarkup}>
            <TitleBar
                title="QR codes"
                primaryAction={{
                    content: 'Create QR code',
                    onAction: () => navigate('/qrcodes/new'),
                }}
            ></TitleBar>
            <Layout>
                <Layout.Section>
                    {loadingMarkup}
                    {qrCodesMarkup}
                    {emptyStateMarkup}
                </Layout.Section>
            </Layout>
        </Page>
    );
}
