// src/middleware/tenant-resolver.tsx
export function SovereigntyProvider(props: { children: React.ReactNode }) {
    return (
        <div className="sovereign-wrapper">
            {props.children}
        </div>
    );
}