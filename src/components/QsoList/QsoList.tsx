import * as React from 'react';
import { Button, Table } from 'react-bootstrap';
import { IQsoListProps } from './IQsoListProps';
import { IQsoListState } from './IQsoListState';

export class QsoList extends React.Component<IQsoListProps, IQsoListState>
{
    constructor(props: IQsoListProps)
    {
        super(props);
    }

    public render(): React.ReactElement<IQsoListProps>
    {
        return(
<Table striped bordered hover>
    <thead>
        <tr>
            <th>#</th>
            <th>Time</th>
            <th>Call sign</th>
            <th>Locator</th>
            <th>Band</th>
            <th>Frequency</th>
            <th>Mode</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
{
    [...this.props.data].map((x, i) =>
        <tr key={i}>
            <td>{i}</td>
            <td>{x.Date} - {x.Time}</td>
            <td>{x.CallSign}</td>
            <td>{x.Locator}</td>
            <td>{x.Band}</td>
            <td>{x.Frequency}</td>
            <td>{x.Mode}</td>
            <td><Button variant="outline-danger" onClick={() => this._onClickRemoveQso(i)}>✕</Button></td>
        </tr>
    )
}
    </tbody>
</Table>
        );
    }


    /**
     * Remove Reference to the list
     * @param index {number} Index of item to be removed from the list
     */
    private _onClickRemoveQso = (index: number): void =>
    {
        this.props.onRemoveQso(index);
    }
}