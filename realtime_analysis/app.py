import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import datetime
import plotly.graph_objs as go
from dash.dependencies import Input, Output

# Membuat aplikasi dash
app = dash.Dash()

app.title = 'Real time CCTV'

# Boostrap CSS.
app.css.append_css({'external_url': 'https://codepen.io/amyoshino/pen/jzXypZ.css'})

# Membuat dash layout
app.layout = html.Div(
    html.Div([
        
        # header judul dashboard
        html.Div([
            html.H1(children='Real time Analysis Dashboard',
                    className = "nine columns"),
            html.Img(
                src="http://www.sccic.id/app/themes/sccic2018/dist/images/logo.png",
                className='three columns',
                style={
                    'height': '14%',
                    'width': '14%',
                    'float': 'right',
                    'position': 'relative',
                    'margin-top': 20,
                    'margin-right': 20
                },
            ),
            html.Div(children='''
                        ISSP - Integrated Smart System Platform
                        ''',
                    className = 'nine columns')
        ], className = "row"),

        html.Div([
            html.Div([
                dcc.Graph(
                    id='example-graph'
                ),
                dcc.Interval(
                    id='interval-component-direction',
                    interval=1*1000,
                    n_intervals=0
                )
            ], className = 'six columns'),
	        html.Div([
	            dcc.Graph(
	                id='example-graph-2'
	            ),
                dcc.Interval(
                    id='interval-component',
                    interval=1*1000,
                    n_intervals=0
                )
	        ], className = "six columns")
    	], className = "row"),

        html.Div([
            html.Div([
                dcc.Graph(
                    id='example-graph-4'
                ),
                dcc.Interval(
                    id='interval-component-color',
                    interval=1*1000,
                    n_intervals=0
                )
            ], className = 'six columns')
        ], className = "row"),

        html.Div([
            html.Div([
                dcc.Graph(
                    id='example-graph-3'
                ),
                dcc.Interval(
                    id='interval-component-speed',
                    interval=1*1000,
                    n_intervals=0
                )
            ], className = 'ten columns')
        ], className = "row")
    ], className='ten columns offset-by-one', style={'padding': '0px 10px 15px 10px',
          'boxShadow': '0px 0px 5px 5px rgba(204,204,204,0.4)'})
)

# ===Fungsi Callback===
# callback direction vehicle
@app.callback(
    Output('example-graph', 'figure'),
    [Input('interval-component-speed', 'n_intervals')]
)
def update_graph_speed(n):
    df = pd.read_csv('direction_vehicle.csv')
    figure = {
        'data': [
            go.Scatter(
                x=(df[df['vehicle_type'] == i]['count']),
                y=df[df['vehicle_type'] == i]['direction'],
                text=df[df['vehicle_type'] == i],
                mode='markers',
                opacity=0.7,
                marker={
                    'size': 15,
                    'line': {'width': 0.5, 'color': 'white'}
                },
                name=i
            ) for i in df.vehicle_type.unique()
        ],
        'layout': 
            go.Layout(
                title= 'Direction Vehicle',
                xaxis={'type': 'log', 'title': 'Count' },
                yaxis={ 'title': 'Direction'},
                margin={'l': 40, 'b': 40, 't': 50, 'r': 10},
                hovermode='closest'
            )
        
    }
    return figure

# callback count vehicle
@app.callback(
    Output('example-graph-2', 'figure'),
    [Input('interval-component', 'n_intervals')]
)
def update_graph(n):
    df = pd.read_csv('vehicle_detection.csv')
    trace1 = go.Bar(
        x = df['vehicle_type'],
        y = df['count'],
        name = 'Hourly Count Vehicle',
        marker=dict(
            color=['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)',
               'rgba(204,204,204,1)', 'rgba(204,204,204,1)',
               'rgba(204,204,204,1)']),
    )
    data = [trace1]
    layout = go.Layout(
        title='Vehicle Count', 
        xaxis = dict(
                title='x Axis',
                titlefont=dict(
                family='Courier New, monospace',
                size=20,
                color='#7f7f7f'
            )),
        yaxis = dict(
            title='y Axis',
            titlefont=dict(
            family='Helvetica, monospace',
            size=20,
            color='#7f7f7f'
        ))
    )
    figure = go.Figure(data=data, layout=layout)
    return figure

# callback color vehicle
@app.callback(
    Output('example-graph-4', 'figure'),
    [Input('interval-component-direction', 'n_intervals')]
)
def update_graph_src(n):
    df = pd.read_csv('vehicle_detection.csv')
    trace1 = go.Pie(
        labels = df['vehicle_type'],
        values = df['count'],
        name = 'Hourly Color Vehicle'
    )
    data = [trace1]
    layout = go.Layout(
        title='Color Vehicle'
    )
    figure = go.Figure(data=data, layout=layout)
    return figure

# callback speed average
@app.callback(
    Output('example-graph-3', 'figure'),
    [Input('interval-component-speed', 'n_intervals')]
)
def update_graph_speed(n):
    df = pd.read_csv('vehicle_detection.csv')
    figure = {
        'data': [
            go.Scatter(
                x=(df[df['vehicle_type'] == i]['Timestamp']),
                y=df[df['vehicle_type'] == i]['speed'],
                text=df[df['vehicle_type'] == i],
                mode='markers',
                opacity=0.7,
                marker={
                    'size': 15,
                    'line': {'width': 0.5, 'color': 'white'}
                },
                name=i
            ) for i in df.vehicle_type.unique()
        ],
        'layout': 
            go.Layout(
                title= 'Speed Count',
                xaxis={'type': 'date', 'title': 'Timestamp' },
                yaxis={'type': 'log', 'title': 'Speed'},
                margin={'l': 40, 'b': 40, 't': 50, 'r': 10},
                hovermode='closest'
            )
        
    }
    return figure

# Server
if __name__ == '__main__':
    app.run_server(host='0.0.0.0', port=8090, debug=True)
