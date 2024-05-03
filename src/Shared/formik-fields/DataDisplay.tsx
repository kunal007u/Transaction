export const DataDisplay = ({ data }) => {
    return (
        <div>
            {data.map((item, index) => (
                <div key={index} className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                    <p className="text-gray-600">{item.key}</p>
                    <p>{item.value ?? "-"}</p>
                </div>
            ))}
        </div>
    );
};