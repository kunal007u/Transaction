import { Skeleton, TableCell, TableRow } from "@mui/material";

export const TableRowsLoader = ({ rowsNum = 5, columnsNum = 1 }) => {
    const renderSkeletonCells = () => {
        const skeletonCells= [];
        for (let i = 1; i < columnsNum; i++) {
            skeletonCells.push(
                <TableCell key={i}>
                    <Skeleton animation="wave" variant="text" />
                </TableCell>
            );
        }
        return skeletonCells;
    };

    return (
        <>
            {[...Array(rowsNum)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell component={"th"} scope="row">
                        <Skeleton animation="wave" variant="text" />
                    </TableCell>
                    {renderSkeletonCells()}
                </TableRow>
            ))}
        </>
    );
};