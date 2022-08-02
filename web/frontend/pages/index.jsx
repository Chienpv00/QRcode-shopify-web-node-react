import {
    Card,
    EmptyState,
    Layout,
    Page,
    SkeletonBodyText,
} from '@shopify/polaris';
import { TitleBar, useNavigate, Loading } from '@shopify/app-bridge-react';

export default function HomePage() {
    const navigate = useNavigate();
    const isLoading = false;
    const isRefetching = false;
    const QRCodes = [];

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
		<Page>
			<TitleBar
				title='QR codes'
				primaryAction={{
					content: 'Create QR code',
					onAction: () => navigate('/qrcodes/new')
				}}
			>
			</TitleBar>
			<Layout>
				<Layout.Section>
					{loadingMarkup}
					{emptyStateMarkup}
				</Layout.Section>
			</Layout>
		</Page>
	);
}
