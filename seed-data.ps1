#!/usr/bin/env powershell

$api = "http://localhost:8080/api"

# Register user
$registerPayload = ConvertTo-Json @{
    name = "Test User"
    email = "test@brutalist.com"
    password = "Test@123"
}

Write-Host "Registering user..."
$regResp = Invoke-WebRequest -Uri "$api/auth/register" -Method POST -ContentType "application/json" -Body $registerPayload -UseBasicParsing
$regData = ConvertFrom-Json $regResp.Content
$token = $regData.token

Write-Host "User registered! Creating listings..."
Write-Host ""

# Create test listings
$listings = @(
    @{title="Minimalist Chair"; description="Wooden brutalist chair"; price=5000; category="Furniture"; imageUrl=""},
    @{title="Steel Shelf"; description="Industrial wall shelf"; price=3200; category="Furniture"; imageUrl=""},
    @{title="Pendant Light"; description="Industrial metal lamp"; price=2500; category="Lighting"; imageUrl=""},
    @{title="Concrete Planter"; description="Minimalist design planter"; price=1800; category="Decor"; imageUrl=""}
)

$headers = @{Authorization="Bearer $token"; "Content-Type"="application/json"}

foreach ($item in $listings) {
    $payload = ConvertTo-Json $item
    $listResp = Invoke-WebRequest -Uri "$api/listings" -Method POST -Headers $headers -Body $payload -UseBasicParsing
    $listData = ConvertFrom-Json $listResp.Content
    Write-Host "Created: $($listData.title) - Rs. $($listData.price)"
}

Write-Host ""
Write-Host "Done! Refresh your browser to see listings."
