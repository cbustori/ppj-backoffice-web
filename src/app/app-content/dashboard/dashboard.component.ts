import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    chartData: any;
    chartOptions: any;

    ngOnInit() {
        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3, 9],
                borderColor: [
                    '#4CAF50',
                ],
                borderWidth: 3,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 3
            }, {
                label: 'Income',
                data: [1, 2, 5, 3, 12, 7, 15],
                backgroundColor: [
                    'rgba(187,222,251,0.2)',
                ],
                borderColor: [
                    '#00BCD4',
                ],
                borderWidth: 3,
                fill: true
            },
                {
                    label: 'Expenses',
                    data: [7, 12, 15, 5, 3, 13, 21],
                    borderColor: [
                        '#e91e63',
                    ],
                    borderWidth: 3,
                    fill: false,
                    pointRadius: [4, 6, 4, 12, 8, 0, 4]
                },
                {
                    label: 'New Users',
                    data: [3, 7, 2, 17, 15, 13, 19],
                    borderColor: [
                        '#FF8F00',
                    ],
                    borderWidth: 3,
                    fill: false
                }]
        };

        this.chartOptions = {
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        };
    }

}
