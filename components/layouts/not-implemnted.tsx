import { Frown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export function NotImplemented({ children }: React.PropsWithChildren) {
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>This feature is not implemented yet <Frown className='size-6 inline-block' /></CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

