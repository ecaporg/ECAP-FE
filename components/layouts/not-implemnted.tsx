import { Frown } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';

export function NotImplemented() {
    return (
        <Card className="flex flex-col items-center justify-center h-[90vh]">
            <CardHeader>
                <CardTitle>This feature is not implemented yet <Frown /></CardTitle>
            </CardHeader>
        </Card>
    )
}

