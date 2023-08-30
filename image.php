<?php
$sourceDirectory = '/server/laravel/storage/app/public/produk/';
$targetDirectory = '/server/storage/produk/';

if (!is_dir($sourceDirectory) || !is_dir($targetDirectory)) {
    echo "Source or target directory doesn't exist.";
    exit;
}

$files = scandir($sourceDirectory);
foreach ($files as $file) {
    if ($file !== '.' && $file !== '..') {
        $sourceFilePath = $sourceDirectory . $file;
        $targetFilePath = $targetDirectory . $file;

        if (is_file($sourceFilePath)) {
            if (copy($sourceFilePath, $targetFilePath)) {
                echo "Copied: $file<br>";
            } else {
                echo "Failed to copy: $file<br>";
            }
        }
    }
}

echo "Copying completed.";
?>