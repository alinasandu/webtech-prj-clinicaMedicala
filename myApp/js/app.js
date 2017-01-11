<!DOCTYPE html>
<html>
    <head>
    
    <title>HOMEPAGE</title>
        <!-- Bootstrap CSS File  -->
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
    </head>
    <body ng-app="myApp">
        <div class="container">
            <h1>AgileResearch PhD Management</h1>
            <div class="row">
            <div class="col-md-3">
                <ul class="nav nav-stacked">
                     <li><a href="/about/">About healthyLIFE</a></li>
                     <li><a href="/specialization/">Information about medical specializations</a></li>
                     <li><a href="/admin/">Doctors</a></li>
                     <li><a href="/database2/">Online appointments</a></li>  
                     
                </ul>
            </div>
            <div class="col-md-9">
                <div ui-view></div>
            </div>
            </div>
            <div class="row">
                <ul class="nav nav-pills" style="float:right">
                    <li><a href="/nodeadmin/" target="_blank">Database Admin</a></li>
                    
                    <li><a href="http://www.csie.ro/" target="_blank">CSIE</a></li>
                </ul>
            </div>
        </div>
        <!-- Jquery JS file -->
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
        
        <!-- Bootstrap JS file -->
        <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.js"></script>
        <script type="text/javascript" src="js/app.js"></script>
       
    </body>
</html>