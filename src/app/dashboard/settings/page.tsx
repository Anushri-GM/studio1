import { PageHeader } from "@/components/common/page-header";
import { SettingsForm } from "./components/settings-form";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-8">
            <PageHeader title="Settings" description="Manage your artisan profile and account settings." />
            <Card>
                <CardContent className="pt-6">
                    <SettingsForm />
                </CardContent>
            </Card>
        </div>
    )
}
