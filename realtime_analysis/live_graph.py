import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import pandas as pd
import plotly.graph_objs as go
import datetime



#print list(df2.Portal)

app = dash.Dash(__name__)
app.layout = html.Div(
    html.Div([
        html.H4('Interval Test'),
        dcc.Graph(id='live-update-graph'),
        dcc.Interval(
            id='interval-component',
            interval=1*1000, # in milliseconds
            n_intervals=0
        )
    ])
)

@app.callback(Output('live-update-graph', 'figure'),
              [Input('interval-component', 'n_intervals')])
def update_graph_live(n):
    df = pd.read_csv('vehicle_detection.csv')

    # Create the graph with subplots
    fig =   {
                'data': [
                        {'x': df['vehicle_type'], 'y': df['count'], 'type': 'line', 'name': 'Hourly Average'},
                        ],
                'layout': {
                            'title': 'Average TTL Per Hour This Week',
                            'showlegend': False
                          }
                }

    return fig



if __name__ == '__main__':
    app.run_server(debug=True)