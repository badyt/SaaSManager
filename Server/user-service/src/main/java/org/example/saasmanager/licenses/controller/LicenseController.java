package org.example.saasmanager.licenses.controller;

import com.example.licenses.api.LicensesApi;
import com.example.licenses.model.LicenseDTO;
import com.example.licenses.model.NewLicense;
import org.example.saasmanager.licenses.service.LicenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LicenseController implements LicensesApi {
    private final LicenseService licenseService;

    @Autowired
    public LicenseController(LicenseService licenseService) {
        this.licenseService = licenseService;
    }

    @Override
    public ResponseEntity<List<LicenseDTO>> getAllLicenses() {
        List<LicenseDTO> licenses = licenseService.getAllLicenses();
        return ResponseEntity.ok(licenses);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public ResponseEntity<LicenseDTO> allocateLicense(NewLicense newLicense){
        LicenseDTO allocatedLicense = licenseService.allocateLicense(newLicense);
        return new ResponseEntity<>(allocatedLicense, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<LicenseDTO>> getAllBySubscription(Integer subscriptionId) {
        List<LicenseDTO> foundLicenses = licenseService.getAllBySubscription(subscriptionId);
        return new ResponseEntity<>(foundLicenses,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public ResponseEntity<Void> revokeLicense(Integer licenseId){
        licenseService.revokeLicense(licenseId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<LicenseDTO>> getAllByUser(Integer userId) {
        List<LicenseDTO> foundLicenses = licenseService.getAllByUser(userId);
        return new ResponseEntity<>(foundLicenses,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<LicenseDTO>> getTeamLicenses(Integer teamId) {
        List<LicenseDTO> foundLicenses = licenseService.getTeamLicenses(teamId);
        return new ResponseEntity<>(foundLicenses,HttpStatus.OK);
    }
}
